-- 4YOS Cloudflare D1 SQLite Schema
-- Fulfills Section 13 & 17: Accounts, Devices, Entitlements, Purchases, Backups, and Rate-limiting.

CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  backup_key_wrapped TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_challenges (
  phone TEXT PRIMARY KEY,
  code_hash TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  device_name TEXT NOT NULL,
  registered_at INTEGER NOT NULL,
  last_active_at INTEGER NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_devices_account_active ON devices (account_id, is_active);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_account ON sessions (account_id);
CREATE INDEX IF NOT EXISTS idx_sessions_device ON sessions (device_id);

CREATE TABLE IF NOT EXISTS purchases (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  reference TEXT UNIQUE NOT NULL,
  item_type TEXT NOT NULL, -- 'course' | 'level' | 'programme'
  item_id TEXT NOT NULL,
  amount_kobo INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'success' | 'failed' | 'refunded'
  created_at INTEGER NOT NULL,
  verified_at INTEGER,
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE TABLE IF NOT EXISTS entitlements (
  account_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  granted_at INTEGER NOT NULL,
  expires_at INTEGER, -- NULL for lifetime, or timestamp
  purchase_id TEXT,
  PRIMARY KEY (account_id, course_id),
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS backups (
  account_id TEXT PRIMARY KEY,
  revision INTEGER NOT NULL DEFAULT 1,
  ciphertext TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  reset_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS notification_preferences (
  account_id TEXT PRIMARY KEY,
  opt_in INTEGER NOT NULL DEFAULT 0,
  muted INTEGER NOT NULL DEFAULT 0,
  study_hour INTEGER NOT NULL DEFAULT 20, -- 8pm
  quiet_hours_start INTEGER NOT NULL DEFAULT 22, -- 10pm
  quiet_hours_end INTEGER NOT NULL DEFAULT 7, -- 7am
  last_notified_date TEXT, -- 'YYYY-MM-DD' strict 1/day cap
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notification_subscriptions (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  endpoint TEXT UNIQUE NOT NULL,
  keys_p256dh TEXT NOT NULL,
  keys_auth TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- Circles & Together System (Section 16 & Section 17 B9)
CREATE TABLE IF NOT EXISTS circles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_by TEXT NOT NULL,
  max_members INTEGER NOT NULL DEFAULT 8,
  is_class_circle INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (created_by) REFERENCES accounts(id)
);

CREATE TABLE IF NOT EXISTS circle_members (
  circle_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member', -- 'lead' | 'member'
  joined_at INTEGER NOT NULL,
  share_grades INTEGER NOT NULL DEFAULT 0, -- Private by default
  is_muted INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (circle_id, account_id),
  FOREIGN KEY (circle_id) REFERENCES circles(id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS circle_goals (
  id TEXT PRIMARY KEY,
  circle_id TEXT NOT NULL,
  title TEXT NOT NULL,
  target_date TEXT NOT NULL,
  target_count INTEGER NOT NULL,
  current_count INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (circle_id) REFERENCES circles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS circle_gingers (
  id TEXT PRIMARY KEY,
  circle_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  recipient_id TEXT NOT NULL,
  preset_key TEXT NOT NULL,
  date_str TEXT NOT NULL, -- 'YYYY-MM-DD' for daily cap
  created_at INTEGER NOT NULL,
  FOREIGN KEY (circle_id) REFERENCES circles(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES accounts(id),
  FOREIGN KEY (recipient_id) REFERENCES accounts(id)
);

CREATE INDEX IF NOT EXISTS idx_circle_gingers_daily ON circle_gingers(sender_id, recipient_id, date_str);

CREATE TABLE IF NOT EXISTS circle_blocks (
  blocker_id TEXT NOT NULL,
  blocked_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (blocker_id, blocked_id),
  FOREIGN KEY (blocker_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (blocked_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS study_sessions (
  id TEXT PRIMARY KEY,
  circle_id TEXT NOT NULL,
  host_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  started_at INTEGER NOT NULL,
  ends_at INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- 'active' | 'completed'
  FOREIGN KEY (circle_id) REFERENCES circles(id) ON DELETE CASCADE,
  FOREIGN KEY (host_id) REFERENCES accounts(id)
);

CREATE TABLE IF NOT EXISTS study_session_participants (
  session_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  joined_at INTEGER NOT NULL,
  completed_minutes INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (session_id, account_id),
  FOREIGN KEY (session_id) REFERENCES study_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- Admin Operations & Student Feedback (Section 17 B11)
CREATE TABLE IF NOT EXISTS class_codes (
  code TEXT PRIMARY KEY,
  discount_percent INTEGER NOT NULL,
  school TEXT,
  max_uses INTEGER NOT NULL DEFAULT 100,
  uses_count INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS mistake_reports (
  id TEXT PRIMARY KEY,
  account_id TEXT,
  lesson_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  issue_type TEXT NOT NULL, -- 'wrong_fact' | 'typo' | 'bad_question' | 'broken_code'
  description TEXT NOT NULL,
  suggested_fix TEXT,
  status TEXT NOT NULL DEFAULT 'open', -- 'open' | 'resolved' | 'dismissed'
  created_at INTEGER NOT NULL,
  resolved_at INTEGER,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS school_requests (
  id TEXT PRIMARY KEY,
  account_id TEXT,
  school_name TEXT NOT NULL,
  programme_name TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'in_progress' | 'supported'
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  action TEXT NOT NULL,
  target_id TEXT NOT NULL,
  details TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS outbox (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'receipt_sms' | 'notification'
  recipient TEXT NOT NULL,
  payload TEXT NOT NULL,
  purchase_id TEXT,
  created_at INTEGER NOT NULL,
  sent_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_outbox_purchase ON outbox (purchase_id);
