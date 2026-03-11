
export default function Button({ label, onClick, type = "button", variant = "primary", disabled = false, className="" 
}) {
    return (
        <button 
        type={type}
        onClick={onClick}
        disabled={disabled}
        className= {`btn btn-${variant} ${className}`}
        >
            {label}
        </button>
    )
}

