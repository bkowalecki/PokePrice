import Portfolio from "../Portfolio/Portfolio";

const LowerPanelContainer = (props) => {

    // const user = props;

    // console.log(user)


return(
    <div className="portfolio">
        <Portfolio props = {props}/>
    </div>
)

}

export default LowerPanelContainer;