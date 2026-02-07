import { Check } from 'lucide-react';

const plans = [
  {
    name: "Developer",
    price: "Free",
    period: "",
    features: [
      "Monitor up to 3 APIs",
      "1 Minute Frequency",
      "Email Alerts",
      "24h History"
    ],
    buttonText: "Manage Plan",
    popular: false,
    gradient: "from-gray-100 to-gray-200"
  },
  {
    name: "Startup",
    price: "$29",
    period: "/mo",
    features: [
      "Monitor up to 20 APIs",
      "30s Frequency",
      "SMS & Slack Alerts",
      "30 Days History"
    ],
    buttonText: "Upgrade",
    popular: true,
    gradient: "from-blue-50 to-blue-100",
    border: "border-blue-200"
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    features: [
      "Unlimited APIs",
      "10s Frequency",
      "Phone Call Alerts",
      "1 Year History"
    ],
    buttonText: "Upgrade",
    popular: false,
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