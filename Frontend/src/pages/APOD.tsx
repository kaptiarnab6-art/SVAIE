
import {useEffect, useState} from 'react'
import axios from 'axios'
import Loader from '../components/Loader';

const APOD = ()=>{

    const [info,setInfo] = useState<any>(null);

    const api_key = import.meta.env.VITE_NASA_API_KEY;

    const fetchData = async()=>{
        try{
            const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`);
            setInfo(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return(
       <div className="container py-4">
  <h2 className="text-center fw-bold text-primary mb-4">
        Astronomy Picture of the Day
  </h2>

  {info ? (
    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
      <div className="row g-0 align-items-center">

        {/* Responsive Image */}
        <div className="col-lg-5 col-md-6 px-3">
          <a href={info.url} target='_blank'>
            <img
            src={info.url}
            alt={info.title}
            className="img-fluid w-100 h-100 rounded"
            style={{ objectFit: "cover", minHeight: "300px" }}
          />
          </a>
        </div>

        {/* Content */}
        <div className="col-lg-7 col-md-6">
          <div className="card-body p-4">
            <h3 className="fw-bold">{info.title}</h3>

            <p className="text-muted">
              📅 {new Date(info.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>

            <p className="text-secondary" style={{ textAlign: "justify" }}>
              {info.explanation}
            </p>
          </div>
        </div>

      </div>
    </div>
  ) : 
      <Loader/>
  }
</div>
    )
}

export default APOD