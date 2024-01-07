import { error } from "console";
import { NotFoundException } from "../../HttpExceptions";
import { OverallStat, Transactions, User } from "../../Models";

export class GeneralService {
  public async findUser(id: string) {
    const user = await User.findById(id).select("-password");
    if (!user) {
      throw new NotFoundException("Not Found");
    }
    return user;
  }
  public async getData() {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transactions.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData?.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData?.find(({ date }) => {
      return date === currentDay;
    });

    return {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    };
  }
}

export const generalService = new GeneralService();
