export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };
  
  export const responseFromUser = ({ user, preferences }) => {
   return  {
    userId: user.id,
    email: user.email,
    name: user.name,
    preferences: preferences.map((pref) => pref.name),
  };
};