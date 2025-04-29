import { motion } from "motion/react";
import { ShieldCheck, Heart, Star } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-14 h-14 text-teal-500" />,
    title: "Comfort",
    description:
      "Enjoy lifestyle amenities designed to provide every homeowner modern comfort, a stone's throw away from schools, churches, and hospitals.",
  },
  {
    icon: <ShieldCheck className="w-14 h-14 text-teal-500" />,
    title: "Extra security",
    description:
      "You can connect with potential tenants without having to share your phone number. We also require all users to register to validate their legitimacy.",
  },
  {
    icon: <Star className="w-14 h-14 text-teal-500" />,
    title: "Luxury",
    description:
      "Find out how we provide the highest standard of professional property management to give you all the benefits of property.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-sm uppercase text-teal-600 font-semibold">
            Our Advantage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">
            Giving you peace of mind
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg" // Added these classes to replace Card
            >
              <div className="flex flex-col items-start gap-4">
                <div className="bg-teal-100 rounded-full p-2">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-md text-slate-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
