import { Icons } from "@/assets/svg/svg";
import styles from "./requisiteCard.module.css";
import { useRequisitesStore } from "@/entities/customer/requisites/useRequisitesStore";
import { useToast } from "@/hooks/use-toast";
import { Requisites } from "@/types/Requisites";

export default function RequisiteCard() {
	const { requisites, deleteReq } = useRequisitesStore();
	const { toast } = useToast();

	if (!requisites || requisites.length === 0) return null;

	const deleteHandler = async (req: Requisites) => {
		await deleteReq(req.id);

		toast({
			done: true,
			description: "Выбранный реквизит удалён.",
		});
	};

	return (
		<div className={styles.reqsWrapper}>
			{requisites.map((req) => (
				<div className={styles.card} key={req.id}>
					{req.name}
					{req.BIK} • {req.account}
					{req.fullName}
					<button
						className={styles.deleteButton}
						onClick={() => deleteHandler(req)}
					>
						<Icons.BlackClose />
					</button>
				</div>
			))}
		</div>
	);
}
