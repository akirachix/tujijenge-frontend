
export function getMamaMbogaCounts(mamaMbogas) {
    const trained = mamaMbogas.filter(m => m.certified_status === "certified").length;
    const untrained = mamaMbogas.length - trained;
  
    return {
      total: mamaMbogas.length,
      trained,
      untrained,
    };
  }
  

  export function getCommunityStats(communities, mamaMbogas) {
  
    const trainedMamaMbogaIds = new Set(
      mamaMbogas
        .filter(m => m.certified_status === "certified")
        .map(m => m.id)
    );
  
    const trainedCommunities = communities.filter(c =>
      c.created_by && trainedMamaMbogaIds.has(c.created_by)
    ).length;
  
    return {
      totalCommunities: communities.length,
      trainedCommunities,
    };
  }
  

  export function getRegistrationsForTrainedMamaMboga(registrations, mamaMbogas) {
    const trainedMamaMbogaIds = new Set(
      mamaMbogas
        .filter(m => m.certified_status === "certified")
        .map(m => m.id)
    );
  

    return registrations.filter(reg => {
      const mamambogaId = typeof reg.mamamboga === 'object' ? reg.mamamboga.id : reg.mamamboga;
      return trainedMamaMbogaIds.has(mamambogaId);
    });
  }
  