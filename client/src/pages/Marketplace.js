import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const VOUCHERS = [
  {
    id: 1,
    title: 'Coffee Voucher',
    description: 'Get a free coffee at any local cafe',
    points: 100,
    image: '☕',
  },
  {
    id: 2,
    title: 'Movie Ticket',
    description: 'One free movie ticket at selected theaters',
    points: 200,
    image: '🎬',
  },
  {
    id: 3,
    title: 'Food Delivery',
    description: '$10 off your next food delivery order',
    points: 150,
    image: '🍽️',
  },
  {
    id: 4,
    title: 'Gaming Voucher',
    description: '$20 gaming platform credit',
    points: 300,
    image: '🎮',
  },
  {
    id: 5,
    title: 'Shopping Discount',
    description: '15% off at selected stores',
    points: 250,
    image: '🛍️',
  },
  {
    id: 6,
    title: 'Premium Subscription',
    description: '1 month of premium features',
    points: 500,
    image: '⭐',
  },
];

const Marketplace = () => {
  const { user, points, spendPoints } = useAuth();
  const [redeemStatus, setRedeemStatus] = useState(null);

  const handleRedeem = (voucher) => {
    if (!user) {
      setRedeemStatus({
        success: false,
        message: 'Please login to redeem vouchers',
      });
      return;
    }

    if (points < voucher.points) {
      setRedeemStatus({
        success: false,
        message: 'Not enough points to redeem this voucher',
      });
      return;
    }

    const success = spendPoints(voucher.points);
    if (success) {
      setRedeemStatus({
        success: true,
        message: `Successfully redeemed ${voucher.title}!`,
      });
      // Here you would typically make an API call to record the redemption
    } else {
      setRedeemStatus({
        success: false,
        message: 'Failed to redeem voucher',
      });
    }

    setTimeout(() => {
      setRedeemStatus(null);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Marketplace</h2>
            <p className="text-gray-600 mt-2">
              Redeem your points for exciting rewards!
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Your Points</p>
            <p className="text-2xl font-bold text-primary-600">{points}</p>
          </div>
        </div>
      </div>

      {redeemStatus && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            redeemStatus.success
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {redeemStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VOUCHERS.map((voucher) => (
          <div key={voucher.id} className="card">
            <div className="text-4xl mb-4">{voucher.image}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {voucher.title}
            </h3>
            <p className="text-gray-600 mb-4">{voucher.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-primary-600 font-semibold">
                {voucher.points} points
              </span>
              <button
                onClick={() => handleRedeem(voucher)}
                disabled={!user || points < voucher.points}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  ${
                    !user || points < voucher.points
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }
                `}
              >
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>

      {!user && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Please login to redeem vouchers with your points!
          </p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
