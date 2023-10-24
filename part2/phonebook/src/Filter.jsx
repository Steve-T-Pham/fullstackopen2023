const Filter = (props) => {
    return(
        <div>filter shown with 
            <input onChange={props.handleFilterChange} value={props.filter} />
        </div> 
    );
}

export default Filter;