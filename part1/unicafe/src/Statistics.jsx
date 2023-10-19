import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, sum }) =>{
    return(
        <div>
            {sum ? <table>
                        <tbody>
                            <StatisticLine text='good' value={good} />
                            <StatisticLine text='neutral' value={neutral} />
                            <StatisticLine text='bad' value={bad} />
                            <StatisticLine text='all' value={sum} />
                            <StatisticLine text='average' value={(good - bad) / sum} />
                            <StatisticLine text='positive' value={`${(good / sum) * 100} %`} />
                        </tbody>
                    </table> 
                : <p>No feedback given</p>
            }
        </div>
    );
}

export default Statistics;