import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const getTeamAdoption = async (id: string) => {
  const teamAdoption = await pb
    .collection("feature_adoptions_view")
    .getFullList({
      filter: `team = "${id}"`,
      sort: "level, category, feature",
    });
  return teamAdoption;
};

const getFeatures = async () => {
  const features = await pb.collection("features").getFullList({
    sort: "category, feature",
  });
  return features;
};

const createScorecard = async ({ team_id }: { team_id: string }) => {
  const features = await getFeatures();
  const data: { team: string; feature: string }[] = [];
  features.forEach((feature) => {
    data.push({
      team: team_id,
      feature: feature.id,
    });
  });
  const newScorecard = await Promise.all(
    data.map((item) =>
      pb.collection("feature_adoptions").create(item, { $autoCancel: false })
    )
  );
  return newScorecard;
};

export { createScorecard, getFeatures, getTeamAdoption };
