import React from 'react';
import { Users } from 'lucide-react';
import { RecommendedRoomCard } from './RecommendedRoomCard';

export type RecommendedRoomsSectionProps = {
  rooms: any[];
  loading: boolean;
  title?: string;
};

export const RecommendedRoomsSection = ({
  rooms,
  loading,
  title = 'Recommended Rooms',
}: RecommendedRoomsSectionProps) => {
  return (
    <div className="mt-8">
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">Sorted by compatibility score</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-gray-500">
          <Users size={36} className="mr-3" />
          Loading rooms…
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-sm text-gray-500">No recommended rooms found.</div>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4">
            {rooms.slice(0, 10).map((room) => (
              <RecommendedRoomCard key={room._id} room={room} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

