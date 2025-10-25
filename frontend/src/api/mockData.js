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
          { type: 'spot', name: 'Solang Valley', category: 'Adventure', visit_time: '2-3 hours', reason: 'Try paragliding or zorbing.', arrival_time: '17:30', depart_time: '19:00', note: 'On the way back from Rohtang.' }
        ]
      },
      {
        day: 3,
        steps: [
          { type: 'spot', name: 'Hadimba Temple', category: 'Cultural', visit_time: '1 hour', reason: 'Explore the unique pagoda-style temple.', arrival_time: '10:00' },
          { type: 'spot', name: 'Old Manali Market', category: 'Leisure', visit_time: '2-3 hours', reason: 'Shop for souvenirs and explore cafes.', arrival_time: '11:30' },
          { type: 'restaurant', options: [{ name: 'The Lazy Dog Lounge', location: 'Old Manali', rating: 4.3, cuisines_served: ['Multi-cuisine'], arrival_time: '14:00', note: 'Lunch by the river.' }] },
          { type: 'travel', from: 'Manali', to: 'Your City', options: [{ mode: 'Bus', time: '12-14 hours', cost: '₹1,000-₹1,500', arrival_time: '08:00 (Next Day)', depart_time: '18:00' }] }
        ]
      }
    ],
    
  }
};
