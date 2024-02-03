import { Bot, Loader2 } from "lucide-react";

export default function LoadingSection() {
	return (
		<div className="gap-x-4 gap-y-2 grid grid-cols-16 items-center">
			<Bot className="h-8 w-8 stroke-zinc-950 col-span-1" />
			<span className="font-bold col-start-2 col-span-full">NewsBot</span>
			<p className="col-start-2 col-span-full">
				<Loader2 className="animate-spin" />
			</p>
		</div>
	);
}
