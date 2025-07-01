

function Button({label, variant = 'primary', onclick}){
    return(
        <button className= {`share-button ${variant}`}  onclick = {onclick}>
           ({label})
        </button>
    )

}
export default Button;
