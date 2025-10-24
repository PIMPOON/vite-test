// import { Card } from "@/components/ui/card";
import { Box, Lightbulb, Printer } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "3D Modeling",
    description: "Custom 3D models designed from scratch to meet your exact specifications. From concept to final design.",
  },
  {
    icon: Box,
    title: "Product Design",
    description: "Innovative design solutions that combine aesthetics with functionality. Bring your unique vision to life.",
  },
  {
    icon: Printer,
    title: "3D Printing",
    description: "High-quality prints using premium materials. PLA, PLA+, ABS, PETG, TPU and more available.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="section">
      <div className="container">
        <h2 style={{ marginBottom: 18 }}>Services</h2>
        <div className="services">
          {services.map((service, index) => (
            <div className="service" key={index} style={{ textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                <service.icon style={{ marginRight: 8 }} />
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
            </div>
          </section>
        );
      };
