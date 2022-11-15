import React from 'react'
import './Portfolio.css'

const Portfolio = (props) => {

    console.log({props})


  return (
    <div className='portfolio-wrapper'>
        <table>
        <tr className='table-heading'>
          <th>Image</th>
          <th>Name</th>
          <th>Set</th>
          <th>Number</th>
          <th>Price</th>
          <th>ID</th>
        </tr>
        <tr>
          <td>png</td>
          <td>Charizard</td>
          <td>Base</td>
          <td>4</td>
          <td>200</td>
          <td>base1-4</td>
        </tr>
      </table>

    </div>
  )
}

export default Portfolio