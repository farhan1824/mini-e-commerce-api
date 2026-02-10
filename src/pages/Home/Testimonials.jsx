import { use } from 'react';
import { AuthContext } from '../../Firebase/Authentication/AuthContext';
import useFetchData from '../Hooks/UseFetchData';

const Testimonials = () => {
    const { loading } = use(AuthContext)
    const { data: testimonials, error } = useFetchData("testimonials");

    if (loading) {
        return (
            <section className="py-12 md:py-16 bg-gray-50 text-center">
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-xl"></span>
            </section>
        );
    }
    if (error) {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: { error },
            footer: '<a href="#">Why do I have this issue?</a>'
        });

    }

    return (
        <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Happy Customers
                    </h2>
                    <p className="text-gray-600">
                        See what our satisfied customers have to say
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                "{testimonial.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;