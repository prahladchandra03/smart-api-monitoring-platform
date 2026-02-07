import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Developer",
      price: "Free",
      features: ["Monitor up to 3 APIs", "1 Minute Frequency", "Email Alerts", "24h History"],
      current: true
    },
    {
      name: "Startup",
      price: "$29/mo",
      features: ["Monitor up to 20 APIs", "30s Frequency", "SMS & Slack Alerts", "30 Days History"],
      current: false
    },
    {
      name: "Enterprise",
      price: "$99/mo",
      features: ["Unlimited APIs", "10s Frequency", "Phone Call Alerts", "1 Year History"],
      current: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
        <p className="text-gray-500 mt-2">Start for free, upgrade when you need more power.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative p-8 bg-white rounded-2xl border ${plan.current ? 'border-blue-600 shadow-lg ring-1 ring-blue-600' : 'border-gray-200 shadow-sm'}`}>
            {plan.current && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                CURRENT PLAN
              </span>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
            <p className="text-4xl font-bold text-gray-900 my-4">{plan.price}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-gray-600 text-sm">
                  <Check className="text-green-500 flex-shrink-0" size={18} />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2 rounded-lg font-medium transition ${plan.current ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
              {plan.current ? 'Manage Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}