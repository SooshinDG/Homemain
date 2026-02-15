export interface InteriorHeroSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeLabel: string;
  afterLabel: string;
}

export const interiorHeroSlides: ReadonlyArray<InteriorHeroSlide> = [
  {
    id: "hero-01",
    title: "Premium Interior Concepts",
    description: "Turn empty spaces into warm, high-converting showroom experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "hero-02",
    title: "Fast Renovation Playbook",
    description: "Reuse proven layouts and launch polished interiors with less design debt.",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "hero-03",
    title: "Data-Backed Visual Merchandising",
    description: "Blend product flow, lighting, and storytelling to increase buyer confidence.",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  },
];

export const interiorBeforeAfterProjects: ReadonlyArray<BeforeAfterProject> = [
  {
    id: "project-01",
    title: "Living Room Refresh",
    beforeImageUrl:
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80",
    afterImageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "project-02",
    title: "Kitchen Concept Upgrade",
    beforeImageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    afterImageUrl:
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
    beforeLabel: "Before",
    afterLabel: "After",
  },
];
