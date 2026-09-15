function Button({label, type = "button", className = "", ...props}) {
    return ( 
        <button 
            type={type} 
            {...props} 
            className={`cursor-pointer inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${className} `} 
        > 
            {label} 
        </button> 
    );
}

export default Button;