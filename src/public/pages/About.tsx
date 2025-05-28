import { FaArrowRight } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import aboutImg from "@/assets/About-img.png";
import Features from "@/public/components/Features";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <main className="pt-24">
        {/* Hero Section */}
        <section className="px-4 py-12 bg-primaryBg">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl text-[#1F2744] font-bold mb-4">
                About <span className="text-primaryColor">Guryasamo</span>
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl">
                Guryasamo is your trusted partner in finding the perfect property. Our mission is to connect buyers, sellers, and renters with their dream homes and investment opportunities. With a curated selection of listings, expert agents, and a commitment to transparency, we make property transactions seamless and stress-free.
              </p>
              <div>
                <Link
                  to={"/listings"}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-primaryColor text-white text-md font-medium hover:opacity-80 transition shadow"
                  style={{ width: "fit-content" }}
                >
                  <span>Browse Listings</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>
            <div className="flex-1 hidden md:flex justify-center">
              <img
                src={aboutImg}
                alt="About EstateHub"
                className="rounded-xl shadow-lg w-full max-w-md object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Story & Why Choose Us */}
        <section className="px-4 py-12 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-[#1F2744]">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                Founded in 2024, EstateHub was created to simplify the property search process. We believe everyone deserves a place to call home, and our platform is designed to empower you with the tools and information you need to make informed decisions. Our team is passionate about real estate and dedicated to providing a seamless experience for all users.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-[#1F2744]">Why Choose Us?</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Verified property listings</li>
                <li>Experienced and friendly agents</li>
                <li>Advanced search and filtering</li>
                <li>Secure and transparent transactions</li>
                <li>Dedicated customer support</li>
              </ul>
            </div>
          </div>
        </section>

        <Features />

        {/* FAQ Section */}
        <section className="px-4 py-12 bg-primaryBg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F2744] mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium text-primaryColor">How do I list my property?</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Simply contact us and our Admins will start working on adding your property to our platform immediately. Fill in the contact form, and reach us now.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium text-primaryColor">Are the listings verified?</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Yes, all properties are verified by our team to ensure authenticity and accuracy before being published on our platform.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium text-primaryColor">Can I contact agents directly?</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Absolutely! Each listing includes agent contact information. You can reach out via phone or email to schedule viewings or ask questions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium text-primaryColor">What if I need help during the process?</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Our support team is here to assist you at every step. Contact us through our support page or email, and we’ll be happy to help.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-12 bg-white">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4">
            <h3 className="text-2xl md:text-3xl text-[#1F2744] font-medium text-center">
              Ready to find your next home?
            </h3>
            <Link
              to={"/listings"}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-primaryColor text-white text-md font-medium hover:opacity-80 transition shadow"
              style={{ width: "fit-content" }}
            >
              <span>Browse Listings</span>
              <FaArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}