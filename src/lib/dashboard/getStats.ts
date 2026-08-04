// Import tipe enum dari Prisma Client, ganti union type manual
import { prisma } from "@/lib/prisma";
import type { $Enums } from "@prisma/client";

export interface DashboardStats {
    totalArticles: number;
    publishedCount: number;
    draftCount: number;
    totalProjects: number;
    totalSkills: number;
    totalExperiences: number;
    recentArticles: RecentArticle[];
}

export interface RecentArticle {
    id: string;
    title: string;
    slug: string;
    status: $Enums.ArticleStatus; // sebelumnya: "DRAFT" | "PUBLISHED"
    updatedAt: Date;
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const [
        totalArticles,
        publishedCount,
        totalProjects,
        totalSkills,
        totalExperiences,
        recentArticles,
    ] = await Promise.all([
        prisma.article.count(),
        prisma.article.count({ where: { status: "published" } }), // lowercase
        prisma.project.count(),
        prisma.skill.count(),
        prisma.experience.count(),
        prisma.article.findMany({
            orderBy: { updatedAt: "desc" },
            take: 5,
            select: {
                id: true,
                title: true,
                slug: true,
                status: true,
                updatedAt: true,
            },
        }),
    ]);

    return {
        totalArticles,
        publishedCount,
        draftCount: totalArticles - publishedCount,
        totalProjects,
        totalSkills,
        totalExperiences,
        recentArticles,
    };
}