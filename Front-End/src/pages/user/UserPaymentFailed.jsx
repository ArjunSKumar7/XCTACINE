// import { Button } from '@material-tailwind/react'
// import React, { useEffect } from 'react'
// import {  PaymentStatusReturnCancel } from '../../api/userApi'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// function PaymentFailed() {
//   const navigate = useNavigate()
//   const user = useSelector((store)=>store.user.userRedux)

//   const data= useSelector((store)=>store.user.userOperationsData)
//   useEffect(()=>{
//     async function confirmPayment(){
//       const reqBodyBooking ={
//         ...data,
//         paymentStatus:'failed',
//         userId:user.userId

//       }

//      const response =  await PaymentStatusReturnCancel(reqBodyBooking)
//      return response

//     }
//     confirmPayment()

//   },[])
//   return (
//     <div className='w-full h-full bg-blue-gray-500'>
       
// <div className="bg-gray-100 h-screen">
//       <div className="bg-white p-6  md:mx-auto">
//         <svg viewBox="0 0 24 24" className="text-red-700 w-16 h-16 mx-auto my-6">
//             <path fill="currentColor"
//                 d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
//             </path>
//         </svg>
//         {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
//   <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// </svg> */}
//         <div className="text-center">
//             <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
//             <p className="text-gray-600 my-2">please go to homepage to continue</p>
//             <p> Sorry for the Inconvinence!  </p>
//             <div className="py-10 text-center">
//                 <Button color='purple' onClick={()=>navigate('/userhome')}>Go Home</Button>
//                 {/* <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"> */}
//                     {/* GO BACK 
//                </a> */}
//             </div>
//         </div>
//     </div>
//   </div>
//     </div>

        
        

        





    
//   )
// }

// export default PaymentFailed