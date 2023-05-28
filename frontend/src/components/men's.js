import { MenData } from "../data/menData";
import {Vortex } from  'react-loader-spinner'
import { useState ,useEffect} from "react";
import axios from "axios";
import close from "../resources/Close.svg"
function Men({categoryWomen , updateWomen,flag,updateFlag,color,updatecolor}){ 
    const[menCategory,updateMenCategory]=useState([])
    const ModalOpen=()=>{
        const[colorAPI,updateColorAPI]=useState([])
       
        useEffect(()=>{
            const baseURL=`${process.env.REACT_APP_API_URL}/color?input=${categoryWomen}`
            // console.log(baseURL)
            axios.get(baseURL)
            .then((response)=>{
                updateColorAPI(response.data)
                // console.log(response.data)
            }).catch((e)=>{
                console.log(e,"error")
            })
            // console.log({color})
        },[categoryWomen])
            return(
                
                <div style={{display: (flag===true?"flex":"none")}} id="outerModal">
                <div id="innerModal">
                 <div id="colorflex">colors
                     <img onClick={()=>updateFlag(false)} width="40vw" src={close} alt=""/>
                 </div>
                 <div id="colorarrange">
                 {colorAPI.map((color)=>{
                     // console.log(color.)
                     return(
                         <div  className={`modalWidth ${color.colorCode}`} id={color.colorCode}  onClick={colorchange} style={{backgroundColor:color.colorCode}}></div>
                     )
                 })}
                 
                 </div>
                </div>
             </div>
               
            )
                }
                useEffect(()=>{
                    const CategoryURL=`${process.env.REACT_APP_API_URL}/men?gender=male`
                    // console.log(baseURL)
                    axios.get(CategoryURL)
                    .then((response)=>{
                       updateMenCategory(response.data)
                        // console.log(response.data)
                    }).catch((e)=>{
                        console.log(e,"error")
                    })
                    // console.log({color})
                },[])
        
    
const updateCategory=(e)=>{
            updateWomen(e.target.alt)
            updateFlag(true)
            // return(
                // console.log(categoryWomen) 
            // )
        }
        const colorchange=(e)=>{
            updatecolor(e.target.id)
        }
             
    return(menCategory.length===0?
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Vortex
                 visible={true}
                 height="80"
                 width="80"
                 ariaLabel="vortex-loading"
                 wrapperStyle={{}}
                 wrapperClass="vortex-wrapper"
                 colors={['white', 'white', 'white', 'white', 'white', 'white']}
                 />
        </div>:
        <div id="menCategory">
            {menCategory.map((image)=>{
                // console.log(image.img)
               return(
                <div className="tops" onClick={updateCategory}>
                   {image.title }
                  <div > <img width="100vw" src={`${process.env.REACT_APP_IMAGE_URL}/images/category/men/${image.img}`} alt={image.title}/></div>
                </div>
               )
              
            })}
           <ModalOpen/>
            
        </div>
    )
}
export default Men;
