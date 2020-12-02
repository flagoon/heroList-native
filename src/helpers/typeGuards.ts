export const isCompleteAvatar = (
  avatar: Partial<Avatar> | Avatar,
): avatar is Avatar => {
  return avatar.avatar_url !== undefined;
};
