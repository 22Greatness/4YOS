// 4YOS Socratic AI Diagnostic Tutor Engine
// Section 20.2 Engine 1: Socratic Diagnostic Tutor & Code Inspector.
// Never provides direct answers; guides learners through mental model self-repair.

export interface DiagnosticDiagnosis {
  category: 'syntax' | 'logic' | 'boundary' | 'performance' | 'misconception';
  summary: string;
  socraticHint: string;
  culturalAnalogy: string;
  ayoReaction: 'think' | 'point' | 'teach' | 'celebrate' | 'wake';
  suggestedCheckLine?: number;
}

export interface CodeEvaluationInput {
  language: 'python' | 'sql' | 'math';
  code: string;
  errorMessage?: string;
  failedTestInput?: string;
  expectedOutput?: string;
  actualOutput?: string;
}

export class SocraticDiagnosticEngine {
  /**
   * Diagnoses a Python code failure and returns tiered Socratic guidance.
   */
  public static diagnosePythonFailure(input: CodeEvaluationInput): DiagnosticDiagnosis {
    const code = input.code || '';
    const error = input.errorMessage || '';

    // 1. Zero Division Trap
    if (error.includes('ZeroDivisionError') || code.includes('/ 0') || code.includes('// 0')) {
      return {
        category: 'boundary',
        summary: 'Division by zero is mathematically and computationally undefined.',
        socraticHint: 'Look closely at your divisor: what happens when your variable reaches zero? How can you guard against an empty denominator before dividing?',
        culturalAnalogy: 'Think of sharing ₦10,000 amongst zero people at a family meeting — there is nobody to receive anything, so the sharing rule breaks down completely.',
        ayoReaction: 'think',
      };
    }

    // 2. Off-by-One / IndexError Trap
    if (error.includes('IndexError') || error.includes('list index out of range')) {
      return {
        category: 'boundary',
        summary: 'Attempted to access an index beyond the bounds of the sequence.',
        socraticHint: 'Remember zero-indexing: in Python, if an array has length N, what is the index of the very last element? Is it N or N - 1?',
        culturalAnalogy: 'If there are 10 seats in a keke bus numbered 0 through 9, passenger #10 cannot sit because seat 10 does not exist!',
        ayoReaction: 'point',
      };
    }

    // 3. Infinite While-Loop State Mutation Failure
    if (code.includes('while ') && !/(\+=|-=|\*=|\/=|\.pop|\.append|counter|break)/.test(code)) {
      return {
        category: 'logic',
        summary: 'The while loop condition does not appear to change state inside the loop body.',
        socraticHint: 'Check your while loop condition: what statement inside the loop changes the variable so that the condition eventually becomes False?',
        culturalAnalogy: 'Like driving a car looking for your street: if you never step on the accelerator or change direction, you stay parked on the same spot forever.',
        ayoReaction: 'teach',
      };
    }

    // 4. Floating Point Precision Misconception
    if (code.includes('0.1 + 0.2') || (input.expectedOutput === '0.3' && input.actualOutput?.includes('0.30000000000000004'))) {
      return {
        category: 'misconception',
        summary: 'Binary floating-point arithmetic (IEEE-754) cannot represent 1/10 exactly in base 2.',
        socraticHint: 'Why does 1/3 repeat forever in base 10 (0.333...)? Does 1/10 repeat in base 2 (binary bits)? How should you compare floats: exact equality (==) or math.isclose()?',
        culturalAnalogy: 'Just like dispensing fuel at ₦1,150.50 per litre: small fractional kobo roundings occur because standard digital meters have finite decimal registers.',
        ayoReaction: 'teach',
      };
    }

    // 5. Assignment vs Equality Trap
    if (code.includes('if ') && /= [^=]/.test(code) && !/==|!=|<=|>=/.test(code)) {
      return {
        category: 'syntax',
        summary: 'Using single assignment operator (=) instead of comparison operator (==) inside a branch condition.',
        socraticHint: 'In Python, what is the difference between setting a variable (assigning) and asking a question about its value (comparing)?',
        culturalAnalogy: 'Giving someone a bag of rice is different from asking them if they already have rice in their kitchen!',
        ayoReaction: 'point',
      };
    }

    // General Fallback Socratic Guidance
    return {
      category: 'logic',
      summary: 'The program output did not match the expected specification for the current test case.',
      socraticHint: 'Trace your program by hand with a pencil and paper using the test input: what is the value of each variable after each line executes?',
      culturalAnalogy: 'Oya, step back and check your steps one by one. Trace the execution like an auditor counting bank float at the close of business.',
      ayoReaction: 'think',
    };
  }

  /**
   * Diagnoses SQL query issues.
   */
  public static diagnoseSqlFailure(sql: string, errorMessage?: string): DiagnosticDiagnosis {
    const query = (sql || '').toUpperCase();

    // 1. NULL comparison trap
    if (query.includes('= NULL') || query.includes('!= NULL')) {
      return {
        category: 'misconception',
        summary: 'Comparing against NULL using equality operators (= or !=) in SQL.',
        socraticHint: 'In relational databases, NULL represents missing or unknown data. Does unknown equal unknown? What special keywords does SQL provide to test for null values?',
        culturalAnalogy: 'If two strangers have unknown phone numbers, you cannot say their phone numbers are equal because you do not know either number!',
        ayoReaction: 'teach',
      };
    }

    // 2. Missing GROUP BY with aggregate functions
    if ((query.includes('COUNT(') || query.includes('SUM(') || query.includes('AVG(')) && !query.includes('GROUP BY') && query.includes('SELECT') && query.split(',').length > 1) {
      return {
        category: 'syntax',
        summary: 'Using aggregate functions alongside unaggregated columns without a GROUP BY clause.',
        socraticHint: 'If you want a total or count per department, which column defines each distinct bucket? Have you declared GROUP BY for that column?',
        culturalAnalogy: 'Counting votes by polling unit: you must separate the ballot boxes by ward before counting each box!',
        ayoReaction: 'point',
      };
    }

    return {
      category: 'logic',
      summary: 'SQL query did not return the expected relational tuples or constraints.',
      socraticHint: 'Inspect your WHERE and JOIN conditions: are you joining on the correct primary-foreign key relationship? Test running each part of the query separately.',
      culturalAnalogy: 'Double-check your ledger entries: ensure the account ID on the credit matches the customer account ID on the debit.',
      ayoReaction: 'think',
    };
  }

  /**
   * Enforces zero-answer policy when a student asks Ayo for complete code solutions.
   */
  public static generateZeroAnswerGuardrail(prompt: string): string {
    return 'Ayo cannot write your solution for you. Let us break down the problem together step-by-step: what is the very first transformation or state change your program needs to perform?';
  }
}
