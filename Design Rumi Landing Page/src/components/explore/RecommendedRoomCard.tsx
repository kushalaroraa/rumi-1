import React from 'react';

export type RecommendedRoomCardProps = {
  room: any;
};

export const RecommendedRoomCard = ({ room }: RecommendedRoomCardProps) => {
  const cover =
    room?.coverUrl ||
    room?.photoUrls?.[0] ||
    'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=200&h=200&fit=crop';

  const locationLabel =
    room?.location?.area ||
    room?.location?.city ||
    room?.location?.address ||
    'Location';

  const score =
    Number(room?.compatibility ?? room?.matchScore ?? room?.score ?? 0) || 0;

  const tags: string[] = Array.isArray(room?.tags) ? room.tags : [];

  return (
    <div className="w-[260px] flex-shrink-0 border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm">
      <div className="relative h-32 bg-slate-100">
        <img src={cover} alt={room?.propertyType || 'Room'} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
          {score}% Match
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {room?.propertyType || 'Room'}
        </p>
        <p className="text-xs text-gray-500 truncate mt-1">{locationLabel}</p>

        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-lg font-bold text-gray-900">₹{room?.monthlyRent ?? 0}</span>
          <span className="text-sm text-gray-500">/ month</span>
        </div>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="px-2 py-1 text-[11px] bg-blue-50 text-blue-700 border border-blue-100 rounded-full font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

