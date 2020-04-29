import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface GetTransacitionsDTO {
  transactions: Transaction[];
  balance: Balance;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((accumulator, trasaction) => {
        return accumulator + trasaction.value;
      }, 0);

    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce((accumulator, trasaction) => {
        return accumulator + trasaction.value;
      }, 0);
    const balance: Balance = { income, outcome, total: income - outcome };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const trasaction = new Transaction({ title, value, type });
    this.transactions.push(trasaction);
    return trasaction;
  }

  public get(): GetTransacitionsDTO {
    const response: GetTransacitionsDTO = {
      transactions: this.all(),
      balance: this.getBalance(),
    };
    return response;
  }
}

export default TransactionsRepository;
