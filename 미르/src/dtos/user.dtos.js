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
  

export const responseFromUser = ({ member, preferences }) => {
  if (!member) {
    return { error: "Member data is undefined" }; // 또는 기본값 처리
  }
  
  const preferFoods = preferences.map(
    (preference) => preference.category?.name || "Unknown"
  );

  return {
    memberId: member.id || "Unknown", // 기본값 설정
    email: member.email || "Unknown",
    name: member.name || "Unknown",
    preferCategory: preferFoods,
  };
};