import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const VideoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const updateProgress = () => {
                const currentProgress = (video.currentTime / video.duration) * 100;
                setProgress(currentProgress);
            };

            video.addEventListener('timeupdate', updateProgress);

            return () => {
                video.removeEventListener('timeupdate', updateProgress);
            };
        }
    }, []);

    const togglePlayback = () => {
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                video.play();
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-loyali-light" id="tutorial">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                        See <span className="bg-gradient-to-r from-loyali-primary to-loyali-secondary bg-clip-text text-transparent">Loyali</span> in Action
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Watch how easy it is to create and share loyalty badges on the Solana blockchain
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="overflow-hidden shadow-xl border-2 border-loyali-light">
                        <div className="relative aspect-video bg-black rounded-t-lg">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/Ye3v3p0YTrk?rel=0"
                                title="Loyali Tutorial"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>


                        </div>

                        <Progress value={progress} className="rounded-none h-1" />

                        <CardContent className="p-6">
                            <h3 className="text-2xl font-semibold mb-2 text-black">How to Create Your First Loyalty Drop</h3>
                            <p className="text-slate-600">
                                This quick walkthrough shows you the simple 4-step process to create and share your first loyalty badge with your community. No coding or technical knowledge required!
                            </p>
                        </CardContent>
                    </Card>

                    <div className="mt-8 flex justify-center">
                        <Link href="/dashboard" className=''>
                            <Button size="lg" className="bg-loyali-primary cursor-pointer hover:bg-loyali-secondary text-white">
                                Try It Yourself
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;