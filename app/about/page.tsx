export default function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            About Crescent Healthcare
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Committed to delivering reliable healthcare solutions that support healthier lives
            with quality, care, and innovation.
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Crescent Healthcare was established with a vision to make quality healthcare products
            accessible and affordable for everyone. We focus on creating dependable solutions that
            meet high standards of safety, effectiveness, and comfort.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To provide high-quality healthcare products that empower individuals to take better
              care of their health with confidence and trust.
            </p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To become a trusted healthcare brand recognized for quality, innovation, and customer
              satisfaction across India.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Why Choose Crescent Healthcare?
          </h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>High-quality, safety-tested healthcare products</li>
            <li>Made in India with trusted manufacturing practices</li>
            <li>Customer-focused service and support</li>
            <li>Affordable pricing without compromising quality</li>
          </ul>
        </section>

        {/* Values */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">Quality</h4>
              <p className="text-sm text-gray-600">
                We maintain strict quality standards to ensure reliability and safety.
              </p>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">Integrity</h4>
              <p className="text-sm text-gray-600">
                Honest practices and transparency guide everything we do.
              </p>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">Care</h4>
              <p className="text-sm text-gray-600">
                We put people and well-being at the center of our decisions.
              </p>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">Innovation</h4>
              <p className="text-sm text-gray-600">
                Continuous improvement to meet evolving healthcare needs.
              </p>
            </div>
          </div>
        </section>

        {/* Closing */}
        <div className="border-t pt-6 text-sm text-gray-600 text-center">
          Crescent Healthcare is dedicated to improving everyday health through trusted products
          and compassionate service.
        </div>

      </div>
    </div>
  );
}
