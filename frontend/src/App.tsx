import {useEffect,useState} from "react";
import axios from "axios";
import "./App.css";
import Header from './components/Header';

interface Question{
  _id:string;
  title:string;
  url:string;
  difficulty:"Easy"|"Medium"|"Hard";
}

interface Category{
  _id:string;
  title:string;
  questions:Question[];
}

interface ApiResponse{
  page:number;
  limit:number;
  totalQuestions:number;
  totalPages:number;
  categories:Category[];
}

const DifficultyBadge=({level}:{level:Question["difficulty"]})=>{
  return <span className={`badge badge-${level.toLowerCase()}`}> {level} </span>;
};

const AccordionItem=({category}:{category:Category})=>{
  const [open,setOpen]=useState(false);

  return(
    <div className="accordion-item">
      <button className="accordion-header" onClick={()=>setOpen(!open)}>
        <span> {category.title} </span>
        <span className="accordion-arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="accordion-body">
          {category.questions.map((q)=>(
            <div key={q._id} className="question-item">
              <div className="question-text">
                <h3>{q.title}</h3>
                <a href={q.url} target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              </div>
              <DifficultyBadge level={q.difficulty||"Easy"}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App(){
  const [categories,setCategories]=useState<Category[]>([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchCategories=async()=>{
      try{
        const {data}=await axios.get<ApiResponse>(
          "http://localhost:5000/api/categories"
        );
        setCategories(data.categories);
      } 
      catch(err){
        console.error("Failed to fetch categories:", err);
      } 
      finally{
        setLoading(false);
      }
    };
    fetchCategories();
  },[]);

  if(loading){
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Header/>
      <h1 className="app-title">Dining Banquet</h1>
      <div className="accordion-list">
        {categories.map((category)=>(
          <AccordionItem key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}
