export const convertPublicRoutine = (publicRoutine) => {
  const routine = { ...publicRoutine };
  delete routine.id;
  delete routine.user_id;
  routine.public_id = publicRoutine.id;
  routine.is_deleted = false;
  routine.created_at = new Date();
  return routine;
};
