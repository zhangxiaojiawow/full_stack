import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticsLine = ({text, value}) => (<tr><td>{text}</td><td>{value}</td></tr>)

const Statistics = ({good, neutral, bad}) => (
  <div>
  {good.value || neutral.value || bad.value ? (
    <table>
      <tbody>
        <StatisticsLine {...good} /> 
        <StatisticsLine {...neutral} /> 
        <StatisticsLine {...bad} /> 
        <StatisticsLine text="all" value= {good.value + neutral.value + bad.value}/>
        <StatisticsLine text="average" value={(good.value - bad.value) / (good.value + neutral.value + bad.value)}/>
        <StatisticsLine text="positive" value={good.value / (good.value + neutral.value + bad.value) * 100 + "%"}/>
      </tbody>
    </table>
  ) : (
    <p>No feedback given</p>
  )}
  </div>
)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const good_prop = {
    text: "good",
    value: good,
    onClick: () => {setGood(good+1)}
  }

  const neutral_prop = {
    text: "neutral",
    value: neutral,
    onClick: () => setNeutral(neutral+1)
  }

  const bad_prop = {
    text: "bad",
    value: bad,
    onClick: () => setBad(bad+1)
  }

  return (
    <div>
    <h1>give feedback</h1>
    <Button {...good_prop} />
    <Button {...neutral_prop} />
    <Button {...bad_prop} />
    <h1>Statistics</h1>
    <Statistics good={good_prop} neutral={neutral_prop} bad={bad_prop} />
    </div>
  )
}

export default App