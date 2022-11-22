import React from 'react'
import pokemon from 'pokemontcgsdk'
import { useEffect } from 'react'
import './Portfolio.css'

const Portfolio = ({cardPortfolio, updatePortfolio}) => {

    const heading = ['Image', 'Price', 'Name', 'Set', 'Number'];

    const column = null;

    // Go through user.portfolio
    // Grab each id and query
    // Set the resulting card object's img, name, set, and price
    // To the corresponding html 

    // cardPortfolio = [{"name":name,...}, {"name":name,...}]
    // const [cardPortfolio, setCardPortfolio] = useState([])

    // console.log(cardPortfolio)

    // Table headings
    const thData = () =>{
        return heading.map((data) =>{
            return <th className='portfolio-heading' key={data}>{data}</th> 
        })
    }

    const tdData = () => {

        if(cardPortfolio.length === 0){
            return(
                <tr><td>No cards to show</td></tr>
                
            )
        }

        const column = Object.keys(cardPortfolio[0])

        console.log({cardPortfolio})
        return cardPortfolio.map((data) => {
        return(
            <tr>
                {
                    column.map((v) => {
                       if(v === "cardImg"){
                        return <td>
                            <img
                                className='card-img-portfolio'
                                src={data[v]} 
                            />
                            </td>
                       }
                       else if(v === "cardId"){
                        return 
                       }
                       else if(v === "cardPrice"){
                        return <td className='table-data'>${data[v]}</td>
                       }
                        return <td className='table-data'>{data[v]}</td>
                    })
                    
                }
            </tr>
        )
        })
    }

    useEffect(() => {
        tdData()
        updatePortfolio();
    }, [cardPortfolio]);

  return (
    <div className='portfolio-wrapper'>
            <table className='portfolio-table'>
                <thead className='table-row'>
                    <tr>{thData()}</tr>
                </thead>
                <tbody>
                    {tdData()}
                </tbody>
              
            </table>

    </div>
)

}

export default Portfolio