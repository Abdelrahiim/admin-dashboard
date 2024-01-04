import { NotFoundException } from "../../HttpExceptions";
import { OverallStat } from "../../Models";

class SalesService {
  public async getOverAllStat() {
    try {
      const overallStat = await OverallStat.findOne();
      return overallStat;
    } catch (e: any) {
      throw new NotFoundException(e.message);
    }
  }
}

export const salesService = new SalesService();
