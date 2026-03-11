import { User } from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * GET /user/profile
 * Returns current user profile (auth required).
 */
export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.userId).select('-passwordHash -otpCode -otpExpiresAt');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    return res.json({ success: true, user: user.toObject() });
  } catch (err) {
    console.error('getProfile error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error.' });
  }
}

/**
 * PUT /user/profile
 * Update profile. Body can include: name, age, gender, city, profession, budgetRange, bio, photo, lifestylePreferences, verificationStatus.
 */
export async function updateProfile(req, res) {
  try {
    const allowed = [
      'name', 'age', 'gender', 'city', 'profession', 'budgetRange', 'bio', 'photo',
      'lifestylePreferences', 'verificationStatus', 'location', 'profilePicture', 'profileCompleted',
    ];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-passwordHash -otpCode -otpExpiresAt');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    return res.json({ success: true, user: user.toObject() });
  } catch (err) {
    console.error('updateProfile error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error.' });
  }
}
