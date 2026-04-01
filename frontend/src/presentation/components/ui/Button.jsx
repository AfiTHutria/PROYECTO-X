
export default function Button({ label, onClick, type = "button",styles,  variant = "primary", disabled = false, className="", 
title= ""}) {

    const baseClass = styles ? styles.btn: 'btn';
    const variantClass = styles ? styles[variant] : `btn-${variant}`;

    return (
        <button 
        type={type}
        onClick={onClick}
        disabled={disabled}
        className= {`${baseClass} ${variantClass} ${className}`}
        title={title}
        >
            {label}
        </button>
    )
}

