import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "./SkeletonTable.module.css";

export default function SkeletonTable() {
	return (
		<div className={styles.SkeletonTable}>
			<table>
				<thead>
				<tr>
					<th>
						<Skeleton className={styles.checkboxSkeleton} />
					</th>
					<th>
						<Skeleton className={styles.headerSkeleton} />
					</th>
					<th>
						<Skeleton className={styles.headerSkeleton} />
					</th>
					<th>
						<Skeleton className={styles.headerSkeleton} />
					</th>
					<th>
						<Skeleton className={styles.headerSkeleton} />
					</th>
					<th>
						<Skeleton className={styles.headerSkeleton} />
					</th>
					<th>
						<Skeleton className={styles.checkboxSkeleton} />
					</th>
				</tr>
				</thead>
				<tbody>
				{Array.from({ length: 10 }).map((_, rowIdx) => (
					<tr key={rowIdx}>
						<td>
							<Skeleton className={styles.checkboxSkeleton} />
						</td>
						<td>
							<div className={styles.tableProductCell}>
								<Skeleton className={styles.image} />
								<div>
									<Skeleton className={styles.productName} />
									<Skeleton className={styles.category} />
								</div>
							</div>
						</td>
						<td>
							<Skeleton className={styles.article} />
							<Skeleton className={styles.barcode} />
						</td>
						<td>
							<Skeleton className={styles.statusSkeleton} />
						</td>
						<td>
							<Skeleton className={styles.price} />
						</td>
						<td>
							<Skeleton className={styles.stock} />
						</td>
						<td>
							<Skeleton className={styles.menu} />
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}
