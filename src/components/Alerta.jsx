const Alerta = ({alert}) => {
    
    return (
        <div className={`${alert.error ?
        'from-red-400 to-red-300' : 'from-indigo-400 to-indigo-600'} 
        bg-gradient-to-tr
        rounded-xl
        text-white
        flex
        justify-center
        text-sm
        alerta
        w-full
        pt-2
        pb-2
        my-3
        `}>
            {alert.msg}
        </div>
    )
}

export default Alerta; 

