function insertGroup({}) {
  const groupsSync = async () => {
    let { data: data, error } = await supabase.from("groups").select("*");
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setGroups(data);
    }
  };

  const groupsInsert = async () => {
    const { user } = session;
    const { data, error } = await supabase
      .from("groups")
      .insert([{ group_name: "basic characters", user_id: user.id }])
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    groupsSync();
  }, []);
  return <></>;
}

export default insertGroup;
