import { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';

interface Question {
  _id: string;
  title: string;
  url: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface Category {
  _id: string;
  title: string;
  questions: Question[];
}

interface ApiResponse {
  categories: Category[];
}

const DifficultyBadge = ({ level }: { level: Question["difficulty"] }) => (
  <span className={`badge badge-${level.toLowerCase()}`}>{level}</span>
);

const AccordionItem = ({ category }: { category: Category }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={() => setOpen(!open)}>
        <span>{category.title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="accordion-body">
          {category.questions.map((q) => (
            <div key={q._id} className="question-item">
              <h3>{q.title}</h3>
              <a href={q.url} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
              <DifficultyBadge level={q.difficulty || "Easy"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get<ApiResponse>("http://localhost:5000/api/categories");
      setCategories(data.categories);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dining Banquet</h1>
      <div className="accordion-list">
        {categories.map((cat) => (
          <AccordionItem key={cat._id} category={cat} />
        ))}
      </div>
    </div>
  );
}
