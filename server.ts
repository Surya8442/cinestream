import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Data
  const categories = [
    { id: "trending", name: "Trending Now" },
    { id: "bollywood", name: "Bollywood Hits" },
    { id: "hollywood", name: "Hollywood Blockbusters" },
    { id: "south-indian", name: "South Indian Special" },
    { id: "web-series", name: "Binge-worthy Series" },
  ];

  const movies = [
    {
      id: "1",
      title: "Pathaan",
      description: "An Indian spy takes on a mercenary who is planning a biological attack on India.",
      category: "bollywood",
      language: "Hindi",
      year: 2023,
      rating: 4.5,
      thumbnail: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=vqu4z34wENw", // Using trailer for streaming demo
      duration: "2h 26m",
      cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
    },
    {
      id: "2",
      title: "The Avengers",
      description: "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
      category: "hollywood",
      language: "English",
      year: 2012,
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=eOrNdBpGMv8",
      duration: "2h 23m",
      cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    },
    {
      id: "3",
      title: "RRR",
      description: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.",
      category: "south-indian",
      language: "Telugu",
      year: 2022,
      rating: 4.9,
      thumbnail: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=NgBoMJy386M",
      duration: "3h 7m",
      cast: ["NTR Jr.", "Ram Charan", "Alia Bhatt"],
    },
    {
      id: "4",
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
      category: "web-series",
      language: "English",
      year: 2016,
      rating: 4.7,
      thumbnail: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2070&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
      duration: "45m / ep",
      cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    },
    {
      id: "5",
      title: "Dangal",
      description: "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.",
      category: "bollywood",
      language: "Hindi",
      year: 2016,
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=x_7YlGv9u1g",
      duration: "2h 41m",
      cast: ["Aamir Khan", "Sakshi Tanwar", "Fatima Sana Shaikh"],
    },
     {
      id: "6",
      title: "Oppenheimer",
      description: "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
      category: "trending",
      language: "English",
      year: 2023,
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
      duration: "3h",
      cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    },
    {
      id: "7",
      title: "Pushpa: The Rise",
      description: "Violence erupts between red sandalwood smugglers and the police in the Seshachalam forests of South India.",
      category: "south-indian",
      language: "Telugu",
      year: 2021,
      rating: 4.6,
      thumbnail: "https://images.unsplash.com/photo-1598897349489-447a963ff33b?q=80&w=2070&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=pKctjlxbFDQ",
      duration: "2h 59m",
      cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"],
    }
  ];

  // API Routes
  app.get("/api/movies", (req, res) => {
    const { category, search } = req.query;
    let filtered = movies;

    if (category) {
      filtered = filtered.filter(m => m.category === category);
    }
    if (search) {
      const q = (search as string).toLowerCase();
      filtered = filtered.filter(m => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }
    res.json(filtered);
  });

  app.get("/api/movies/:id", (req, res) => {
    const movie = movies.find(m => m.id === req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  });

  app.get("/api/categories", (req, res) => {
    res.json(categories);
  });

  app.post("/api/auth/login", (req, res) => {
    const { email } = req.body;
    // Simple simulation
    res.json({ id: "user_1", email, name: email.split('@')[0], avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
