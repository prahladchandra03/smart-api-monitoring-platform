import { Check } from 'lucide-react';

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    features: [
      "Monitor 5 APIs",
      "1 Hour Check Frequency",
      "24h Data Retention",
      "Email Alerts"
    ],
    buttonText: "Get Started",
    popular: false,
    gradient: "from-gray-100 to-gray-200"
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    features: [
      "Unlimited APIs",
      "1 Minute Check Frequency",
      "30 Days Data Retention",
      "Slack & SMS Alerts",
      "Team Members"
    ],
    buttonText: "Subscribe Now",
    popular: false,
    gradient: "from-blue-50 to-blue-100",
    border: "border-blue-200"
  },
  {
    name: "Lifetime",
    price: "₹999",
    period: "one-time",
    features: [
      "Everything in Pro",
      "Lifetime Updates",
      "Priority Support",
      "Early Access to Features",
      "No Recurring Fees"
    ],
    buttonText: "Grab Lifetime Deal",
    popular: true, // Highlights this card
    gradient: "from-purple-600 to-indigo-600",
    dark: true
  }
];

export default function Pricing() {
  return (
    <div className="py-20 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 text-lg">Start for free, upgrade when you scale.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl p-8 border transition-transform hover:-translate-y-1 duration-300
                ${plan.popular ? 'border-purple-500 shadow-xl ring-2 ring-purple-500 ring-opacity-50' : 'border-gray-200 shadow-sm'}
                ${plan.dark ? 'bg-gradient-to-br ' + plan.gradient + ' text-white' : 'bg-white'}
              `}
            >
              
              {/* Limited Offer Badge for Lifetime */}
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                  Limited Offer
                </span>
              )}

              <h3 className={`text-xl font-semibold mb-2 ${plan.dark ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-bold ${plan.dark ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.dark ? 'text-purple-200' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${plan.dark ? 'bg-purple-500' : 'bg-blue-100'}`}>
                      <Check size={14} className={plan.dark ? 'text-white' : 'text-blue-600'} />
                    </div>
                    <span className={`text-sm ${plan.dark ? 'text-purple-100' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-semibold transition-colors
                ${plan.dark 
                  ? 'bg-white text-purple-600 hover:bg-gray-100' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'}
              `}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}