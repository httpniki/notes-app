interface Props {
   fill?: string
}

export default function CreateNoteSVG({ fill="#ffffff" }: Props) {
   return(
      <svg 
         width={22} 
         fill='#ffffff' 
         viewBox="0 0 24 24" 
         xmlns="http://www.w3.org/2000/svg">
         <title/>
         <path 
            d="M17,22H5a3,3,0,0,1-3-3V7A3,3,0,0,1,5,4H9A1,1,0,0,1,9,6H5A1,1,0,0,0,4,7V19a1,1,0,0,0,1,1H17a1,1,0,0,0,1-1V15a1,1,0,0,1,2,0v4A3,3,0,0,1,17,22Z" 
            fill={fill}/>
         <path d="M14.6,5.87l-4.95,5a.41.41,0,0,0-.13.23l-1,3.82a.48.48,0,0,0,.13.48A.47.47,0,0,0,9,15.5a.32.32,0,0,0,.13,0l3.82-1a.41.41,0,0,0,.23-.13L18.13,9.4Z" 
            fill={fill}/>
         <path d="M21,4.45,19.55,3a1.52,1.52,0,0,0-2.13,0L16,4.45,19.55,8,21,6.58A1.52,1.52,0,0,0,21,4.45Z" 
            fill={fill}
         />
      </svg>
   )
}
