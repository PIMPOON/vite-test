import { ModelViewer } from "./ModelViewer";
// import { samplePrint } from "./assets/sample_print.jpg";

const portfolioItems = [
  {
    title: "Bouchon pour piscine",
    description: "Bouchon de vidange pour filtre à sable sur mesure",
    type: "3d-model",
    modelUrl: "/models/hardsand_cap.glb",
    tags: ["3D Model", "Custom"],
  },
  {
    title: "Bouchon pour piscine",
    description: "Bouchon de vidange pour filtre à sable sur mesure",
    type: "3d-model",
    modelUrl: "/models/car_lift.glb",
    tags: ["3D Model", "Engineering"],
  },
  {
    title: "Geometric Art Piece",
    description: "Custom designed decorative object with intricate patterns",
    type: "3d-model",
    tags: ["Art", "Design"],
  },
  // {
  //   title: "Precision Component",
  //   description: "High-detail functional part with perfect tolerances",
  //   type: "image",
  //   image: samplePrint,
  //   tags: ["Precision", "Manufacturing"],
  // },
];

export const Portfolio = () => {
  return (
    <section id="work" className="section">
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <h2>Selected Work</h2>
          <span className="text-muted">A glimpse at recent projects</span>
        </div>
        <div className="grid">
          {portfolioItems.map((item, index) => (
            <article
              className="tile"
              key={index}
              aria-label={item.title}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.type === "3d-model" ? (
                <div 
                  className="thumb relative bg-gradient-to-br from-secondary to-muted">
                  <ModelViewer
                    className="w-full h-full"
                    src={item.modelUrl}
                  />
                </div>
              ) : (
                <div className="thumb relative h-[400px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <h3>{item.title}</h3>
              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};