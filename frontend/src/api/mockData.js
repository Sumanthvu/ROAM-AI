// src/api/mockData.js

export const mockSuggestions = {
  places: [
    {
      place: 'Manali, Himachal Pradesh',
      reason: 'A beautiful mountain town offering a perfect blend of adventure and scenic beauty, ideal for friends looking for trekking and mountain experiences.',
      weather_suitability: 'March to June, with temperatures from 10°C to 25°C.',
      travel_cost_estimate: { flight: '₹8,000–₹15,000', train: 'N/A', bus: '₹800–₹1,500' },
      accommodation_range: '₹2,000–₹8,000/night',
      safety_rating: 'High',
      accessibility: 'Nearest airport is Bhuntar (KUU), about 50km away. Well-connected by road from Delhi and Chandigarh.',
      permit_required: 'No (Yes for Rohtang Pass in certain conditions)',
      photos: [
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
        'https://images.unsplash.com/photo-1605649487212-47bdab064df7',
        'https://images.unsplash.com/photo-1598104134138-19597ebb2a00',
      ],
    },
    {
      place: 'Rishikesh, Uttarakhand',
      reason: 'Known as the "Yoga Capital of the World" and a hub for adventure sports like white-water rafting and bungee jumping.',
      weather_suitability: 'September to November and March to April.',
      travel_cost_estimate: { flight: '₹5,000–₹10,000 (to Dehradun)', train: '₹500–₹1,200', bus: '₹400–₹800' },
      accommodation_range: '₹1,500–₹7,000/night',
      safety_rating: 'High',
      accessibility: 'Nearest airport is Jolly Grant (DED) in Dehradun. Well-connected by road and rail.',
      permit_required: 'No',
      photos: [
        'https://images.unsplash.com/photo-1593183997728-3b3d5671a4f6',
        'https://images.unsplash.com/photo-1600133276336-26792f52a7b6',
      ],
    },
  ],
};

export const mockLocalInfo = {
  formatted: {
    top_attractions: [
      { name: 'Rohtang Pass', description: 'A high mountain pass offering snow activities and breathtaking views.', category: 'Adventure', why_visit: 'For snow sports and panoramic Himalayan scenery.', best_time_of_day: 'Morning' },
      { name: 'Solang Valley', description: 'A popular spot for paragliding, zorbing, and skiing in winter.', category: 'Adventure', why_visit: 'Hub of adventure sports.', best_time_of_day: 'Daytime' },
      { name: 'Hadimba Temple', description: 'An ancient cave temple dedicated to Hidimbi Devi, set in a cedar forest.', category: 'Cultural', why_visit: 'Unique architecture and serene location.', best_time_of_day: 'Morning' },
      { name: 'Old Manali', description: 'Known for its laid-back cafes, guesthouses, and vibrant market.', category: 'Leisure', why_visit: 'Bohemian vibe and great food.', best_time_of_day: 'Evening' },
    ],
    local_cuisine: [
      { dish: 'Siddu', description: 'A local steamed bread made from wheat flour, often stuffed with filling.', recommended_places: ['Local Dhabas', 'Johnson\'s Cafe'] },
      { dish: 'Dham', description: 'A traditional festive meal served on special occasions, featuring a platter of various dishes.', recommended_places: ['Traditional Himachali Restaurants'] },
      { dish: 'Trout Fish', description: 'Freshly caught from the Beas river and prepared in various styles.', recommended_places: ['Johnson\'s Cafe', 'The Lazy Dog Lounge'] },
    ],
  },
};

// src/api/mockData.js

// ... (mockSuggestions and mockLocalInfo are above this)

export const mockItinerary = {
  formatted: {
    itinerary: [
      {
        day: 1,
        steps: [
          { type: 'travel', from: 'Your City', to: 'Manali', options: [{ mode: 'Bus', time: '12-14 hours', cost: '₹1,000-₹1,500', arrival_time: '08:00', depart_time: '18:00 (Previous Day)' }] },
          { type: 'accommodation', options: [{ name: 'Hotel Snow Valley', location: 'Manali', price_range: '₹3,000-₹5,000/night', rating: 4.0, arrival_time: '10:00', note: 'Check-in and freshen up.' }] },
          { type: 'restaurant', options: [{ name: 'Johnson\'s Cafe', location: 'Old Manali', rating: 4.5, cuisines_served: ['Indian', 'Continental'], arrival_time: '19:00', note: 'Dinner with a great ambiance.' }] },
          { type: 'cuisine', dish: 'Siddu', origin: 'Himachal Pradesh', time_to_consume: 'During Dinner', note: 'Try this local specialty.' }
        ]
      },
      {
        day: 2,
        steps: [
          { type: 'spot', name: 'Rohtang Pass', category: 'Adventure', visit_time: 'Full Day', reason: 'Enjoy snow activities and stunning mountain views.', arrival_time: '09:00', depart_time: '17:00' },
          { type: 'break', duration: '1 hour', activity: 'Lunch at a local dhaba near Rohtang.', arrival_time: '13:00' },
        ]
      },
      {
        day: 3,
        steps: [
          { type: 'travel', from: 'Manali', to: 'Your City', options: [{ mode: 'Bus', time: '12-14 hours', cost: '₹1,000-₹1,500', arrival_time: '08:00 (Next Day)', depart_time: '18:00' }] }
        ]
      }
    ],
    safety: {
      overall_risk_level: 'Low',
      common_scams: ['Overpriced taxi rides', 'Fake tour guides offering cheap packages'],
      neighborhood_safety: [{ area: 'Old Manali', note: 'Generally safe and tourist-friendly, but avoid walking alone late at night in isolated areas.', best_time_to_visit: 'Daytime and Evening' }],
      local_laws_and_norms: ['Respect local customs and dress modestly when visiting religious sites.', 'Public consumption of alcohol is prohibited.'],
      health: { food_water_safety: 'Drink bottled or filtered water. Eat from reputable restaurants.', mosquito_advice: 'Not a major concern at high altitude, but can be present in lower areas.', altitude_note: 'Acclimatize for a day upon arrival to avoid altitude sickness.' },
      emergency_contacts: { all_emergencies: '112', police: '100', ambulance: '108', fire: '101' },
    },
    packing: {
      season: 'Summer',
      essentials: [{ item: 'Backpack', why: 'To carry your belongings during day trips.', qty: '1' }, { item: 'Water Bottle', why: 'Stay hydrated, especially at high altitudes.', qty: '1' }],
      clothing: [{ item: 'Fleece Jacket', why: 'For cool evenings and higher altitudes.', qty: '1-2' }, { item: 'T-shirts', why: 'Comfortable for daytime wear.', qty: '4-5' }, { item: 'Trekking Pants', why: 'For comfort and durability during hikes.', qty: '2 pairs' }],
      footwear: [{ item: 'Hiking Boots', why: 'Essential for trekking and uneven terrain.', qty: '1 pair' }, { item: 'Sandals/Floaters', why: 'For relaxing at the hotel or walking around town.', qty: '1 pair' }],
      gadgets: [{ item: 'Power Bank', why: 'To keep your devices charged on the go.', qty: '1' }, { item: 'Camera', why: 'To capture the stunning landscapes.', qty: '1' }],
      documents_money: [{ item: 'ID/Passport', why: 'For identification and check-ins.', qty: '1' }, { item: 'Cash', why: 'ATMs can be unreliable in remote areas.', qty: 'Sufficient' }],
    },
    budget: {
      budget_range: { transport: [5000, 10000], accommodation: [15000, 20000], food: [5000, 10000], entertainment: [3000, 5000] },
      per_day_estimate_per_person: { transport: '₹833 - ₹1,667', accommodation: '₹2,500 - ₹3,333', food: '₹833 - ₹1,667', entertainment: '₹500 - ₹833', total: '₹4,666 - ₹7,500' },
      notes: ['Estimates based on 2 people for 3 days.', 'Costs for adventure sports are extra.'],
    },
  },
};
