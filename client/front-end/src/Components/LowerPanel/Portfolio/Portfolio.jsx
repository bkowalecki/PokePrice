import React from 'react'
import { useEffect } from 'react'
import './Portfolio.css'

const Portfolio = ({cardPortfolio, updatePortfolio}) => {

    const heading = ['Image', 'Price', 'Name', 'Set', 'Number'];

    const column = null;

    let numberOfCards = 0;
    let totalPortfolioValue = 0;

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
                <tr className='empty-row'><td className='empty-cell'>No cards to show</td></tr>
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
                        // alert(data[v])
                        totalPortfolioValue = totalPortfolioValue+data[v]
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
        // tdData()
        updatePortfolio();
    }, [cardPortfolio]);

  return (
    <div className='portfolio'>
        
        <div className='portfolio-stats-wrapper'>
                <div className='total-cards-wrapper'>
                    <div>Cards</div>
                    <div>{cardPortfolio.length}</div>
                </div>

                <div className='total-value-wrapper'>
                        <div>Portfolio Value</div>
                       <div>${totalPortfolioValue}</div> 
                </div>
        </div>

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

    </div>
)

}

export default Portfolio