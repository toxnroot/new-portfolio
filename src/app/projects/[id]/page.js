import ProjectDetails from '@/components/ProjectDetails';

export async function generateMetadata({ params }) {
    const { id } = await params;
    return {
        title: `Project Details | Portfolio`,
        description: 'Explore details about this project in my portfolio.',
    };
}

export default async function ProjectPage({ params }) {
    const { id } = await params;

    return (
        <ProjectDetails id={id} />
    );
}
