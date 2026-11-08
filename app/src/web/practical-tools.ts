import { POS_RECONCILIATION_TASK, STATISTICAL_AUDIT_TASK, LOGIC_DEDUCTION_TASK } from '../core/assignments.ts';
export { getAssignmentTask } from '../core/assignments.ts';

export const PRACTICAL_STARTERS: Record<string, string> = {
  'pos-float-audit': POS_RECONCILIATION_TASK.starterCode,
  'pos-cash-reconciliation-v1': POS_RECONCILIATION_TASK.starterCode,
  'sta-fare-dispersion-v1': STATISTICAL_AUDIT_TASK.starterCode,
  'sta-statistical-audit-v1': STATISTICAL_AUDIT_TASK.starterCode,
  'mth-set-partition-v1': LOGIC_DEDUCTION_TASK.starterCode,
  'mth-logic-deduction-v1': LOGIC_DEDUCTION_TASK.starterCode,
  'sme-inventory-sql': `-- 200L Practical: Supermarket & Pharmacy Relational Database Schema
-- Task: Design 3NF tables with foreign keys and check constraints.

CREATE TABLE suppliers (
    supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    state TEXT NOT NULL DEFAULT 'Rivers'
);

CREATE TABLE inventory_batches (
    batch_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    supplier_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    cost_price REAL NOT NULL,
    selling_price REAL NOT NULL,
    expiry_date TEXT NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

CREATE TABLE sales_receipts (
    receipt_id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id INTEGER NOT NULL,
    units_sold INTEGER NOT NULL CHECK (units_sold > 0),
    total_amount REAL NOT NULL,
    sold_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES inventory_batches(batch_id)
);
`,
  'micro-lending-risk-model': `# 200L Practical: Micro-Lending Credit Risk Scoring Model
# Task: Compute default risk score (0 to 100) for Onitsha market traders.

def calculate_micro_lending_score(daily_turnover, airtime_topups_count, utility_paid_ratio):
    score = 0
    if daily_turnover >= 50000:
        score += 40
    elif daily_turnover >= 20000:
        score += 25
    else:
        score += 10

    if airtime_topups_count >= 15:
        score += 30
    elif airtime_topups_count >= 5:
        score += 15
    else:
        score += 5

    score += min(30, int(utility_paid_ratio * 30))
    risk = 'LOW' if score >= 75 else ('MEDIUM' if score >= 45 else 'HIGH')
    return score, risk
`,
  'ussd-state-machine': `# 200L Practical: USSD Banking Menu & Session State Machine
# Task: Model an asynchronous USSD state machine with timeout handling.

class USSDSession:
    def __init__(self, session_id, phone_number):
        self.session_id = session_id
        self.phone_number = phone_number
        self.state = 'INITIAL' # INITIAL -> MENU -> ENTER_PIN -> CONFIRM -> COMPLETED
        self.balance = 50000

    def handle_input(self, user_input):
        if self.state == 'INITIAL' and user_input == '*737#':
            self.state = 'MENU'
            return "1. Check Balance\\n2. Transfer Money\\n3. Buy Airtime"
        elif self.state == 'MENU' and user_input == '1':
            self.state = 'COMPLETED'
            return f"Your account balance is ₦{self.balance:,}. Thank you."
        elif self.state == 'MENU' and user_input == '2':
            self.state = 'ENTER_PIN'
            return "Enter 4-digit PIN:"
        elif self.state == 'ENTER_PIN':
            self.state = 'COMPLETED'
            return "Transfer successful. SMS receipt sent."
        return "Session timed out or invalid input."
`,
  'solar-telemetry-monitor': `# 100L Practical: Solar Inverter Battery Ah Capacity & Run-Time Calculator
# Task: Calculate usable kWh and run-time under specified Watt load.

def calculate_solar_runtime(voltage=24, amphours=200, load_watts=350, battery_type='tubular'):
    dod = 0.50 if battery_type == 'tubular' else 0.85
    inverter_eff = 0.88
    usable_wh = (voltage * amphours) * dod
    runtime_hrs = (usable_wh * inverter_eff) / load_watts
    return round(runtime_hrs, 2)
`,
  'paystack-webhook-processor': `# 300L Practical: Fault-Tolerant Paystack Webhook Settlement Engine
# Task: HMAC-SHA512 verification and idempotent settlement handler.

def process_paystack_webhook(event_payload, verified_hmac):
    if not verified_hmac:
        return {"status": "error", "message": "Invalid HMAC signature"}
    if event_payload.get("event") != "charge.success":
        return {"status": "ignored", "reason": "unhandled_event"}
    data = event_payload.get("data", {})
    return {
        "status": "success",
        "reference": data.get("reference"),
        "amount": data.get("amount"),
        "settled": True
    }
`,
  'course-reg-rate-limiter': `# 300L Practical: University Portal Token-Bucket Edge Rate Limiter
# Task: Rate limit 50,000 concurrent students hitting portal registration at 8:00 AM.

class TokenBucketLimiter:
    def __init__(self, capacity=1000, refill_rate=200):
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.tokens = capacity
        self.last_refill = 0.0

    def allow_request(self, current_time):
        elapsed = current_time - self.last_refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        self.last_refill = current_time
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False
`,
  'sovereign-capstone-viva': `# 400L Capstone: High-Availability Distributed Systems Viva & Offline Ledger
# Task: Define 3-way merge conflict resolution for concurrent offline edits.

def resolve_offline_conflict(local_attempt, remote_attempt):
    if local_attempt["percent"] > remote_attempt["percent"]:
        return local_attempt
    elif remote_attempt["percent"] > local_attempt["percent"]:
        return remote_attempt
    return local_attempt if local_attempt["at"] <= remote_attempt["at"] else remote_attempt
`
};


export const PRACTICAL_EXPLANATION_DEFAULTS: Record<string, string> = {
  'pos-float-audit': 'Daily POS terminal float balanced. Cash-in and cash-out computed in integer kobo with duplicate references rejected.',
  'pos-cash-reconciliation-v1': 'Daily POS terminal float balanced. Cash-in and cash-out computed in integer kobo with duplicate references rejected.',
  'sta-fare-dispersion-v1': 'The median fare of ₦500 reflects the true typical commuter cost because extreme surge fares like ₦10,000 distort the mean without shifting the median.',
  'sta-statistical-audit-v1': 'The median fare of ₦500 reflects the true typical commuter cost because extreme surge fares like ₦10,000 distort the mean without shifting the median.',
  'mth-set-partition-v1': 'Using the Principle of Inclusion-Exclusion, total unique contributors equal 12 + 9 - 5 = 16, leaving 8 outside both sets in the 24-person team.',
  'mth-logic-deduction-v1': 'Using the Principle of Inclusion-Exclusion, total unique contributors equal 12 + 9 - 5 = 16, leaving 8 outside both sets in the 24-person team.'
};
